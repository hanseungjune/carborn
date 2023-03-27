package site.carborn.service.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import site.carborn.entity.account.Account;
import site.carborn.entity.car.Car;
import site.carborn.entity.company.Inspector;
import site.carborn.entity.company.InspectorReview;
import site.carborn.entity.user.InspectBook;
import site.carborn.mapping.company.InspectorReviewMapping;
import site.carborn.mapping.user.*;
import site.carborn.repository.account.AccountRepository;
import site.carborn.repository.car.CarRepository;
import site.carborn.repository.company.InspectorRepository;
import site.carborn.repository.company.InspectorReviewRepository;
import site.carborn.repository.user.InspectBookRepository;
import site.carborn.repository.user.InspectResultRepository;
import site.carborn.util.board.BoardUtils;
import site.carborn.util.common.BookUtils;

import java.time.LocalDateTime;

@Service
public class UserInspectService {
    @Autowired
    private InspectBookRepository inspectBookRepository;
    @Autowired
    private InspectResultRepository inspectResultRepository;

    @Autowired
    private InspectorReviewRepository inspectorReviewRepository;

    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private InspectorRepository inspectorRepository;
    @Autowired
    private CarRepository carRepository;

    public Page<UserInspectBookListMapping> inspectBookList(String accountId, int page, int size){
        Page<UserInspectBookListMapping> inspectBookList = inspectBookRepository.findByStatusAndAccount_Id(
                BoardUtils.BOARD_DELETE_STATUS_FALSE,
                accountId
                ,BoardUtils.pageRequestInit(
                        page
                        ,size
                        ,"id", BoardUtils.ORDER_BY_DESC
                )
        );
        if(inspectBookList.isEmpty()){
            throw new NullPointerException("해당 페이지의 데이터가 존재하지 않습니다");
        }
        return inspectBookList;
    }


    public UserInspectBookDetailMapping inspectBookDetail(Integer id){
        UserInspectBookDetailMapping inspectBook = inspectBookRepository.findAllByIdAndStatus(id,BoardUtils.BOARD_DELETE_STATUS_FALSE);

        if (inspectBook == null){
            throw new RuntimeException("존재하지 않는 데이터입니다");
        }

        return inspectBook;
    }


    public int createInspectBook(InspectBook inspectBook){

        if (inspectBook.getAccount().getId().isBlank()) {
            throw new RuntimeException("세션이 만료되었습니다");
        }
        Account account = accountRepository.findById(inspectBook.getAccount().getId());
        if (account == null){
            throw new RuntimeException("존재하지 않는 아이디입니다");
        }

        Inspector inspector = inspectorRepository.findById(inspectBook.getInspector().getId()).orElseThrow(()->
                new RuntimeException("존재하지 않는 검수원입니다"));

        Car car = carRepository.findById(inspectBook.getCar().getId()).orElseThrow(()->
                new RuntimeException("등록되지 않은 차입니다"));

        inspectBook.setRegDt(LocalDateTime.now());
        inspectBook.setUptDt(LocalDateTime.now());
        inspectBook.setBookStatus(BookUtils.BOOK_STATUS_WAIT);
        inspectBook.setStatus(BoardUtils.BOARD_DELETE_STATUS_FALSE);

        InspectBook save = inspectBookRepository.save(inspectBook);
        return save.getId();
    }

    public void deleteInspectBook(Integer id){
        InspectBook delete = inspectBookRepository.findById(id).orElseThrow(() ->
                new RuntimeException("존재하지 않는 데이터입니다")
        );

        if (delete.isStatus() == BoardUtils.BOARD_DELETE_STATUS_TRUE) {
            throw new RuntimeException("삭제된 데이터입니다");
        }

        delete.setStatus(BoardUtils.BOARD_DELETE_STATUS_TRUE);
        delete.setUptDt(LocalDateTime.now());
        inspectBookRepository.save(delete);
    }


    public int updateInspectBook(InspectBook inspectBook, int inspectBookId) {

        if (inspectBook.getAccount().getId().isBlank()) {
            throw new RuntimeException("세션이 만료되었습니다");
        }

        if (accountRepository.findById(inspectBook.getAccount().getId())==null){
            throw new RuntimeException("존재하지 않는 아이디입니다");
        }
        if (inspectBook.getId() != inspectBookId){
            throw new RuntimeException("잘못된 경로입니다");
        }
        InspectBook update = inspectBookRepository.findById(inspectBookId).orElseThrow(()->
                new RuntimeException("존재하지 않는 데이터입니다"));

        if (!inspectBook.getAccount().getId().equals(update.getAccount().getId())){
            throw new RuntimeException("권한이 없습니다??");
        }

        Inspector inspector = inspectorRepository.findById(inspectBook.getInspector().getId()).orElseThrow(()->
                new RuntimeException("존재하지 않는 검수원입니다"));

        Car car = carRepository.findById(inspectBook.getCar().getId()).orElseThrow(()->
                new RuntimeException("등록되지 않은 차입니다"));

        update.setCar(inspectBook.getCar());
        update.setContent(inspectBook.getContent());
        update.setBookDt(inspectBook.getBookDt());
        update.setUptDt(LocalDateTime.now());

        inspectBookRepository.save(update);
        return update.getId();
    }

    //검수완료
    public Page<UserInspectResultListMapping> inspectResultList(String accountId, int page, int size) {
        Page<UserInspectResultListMapping> inspectResultList = inspectResultRepository.findByInspectBook_StatusAndInspectBook_Account_Id(
                BoardUtils.BOARD_DELETE_STATUS_FALSE,
                accountId
                ,BoardUtils.pageRequestInit(
                        page
                        ,size
                        ,"inspectDt", BoardUtils.ORDER_BY_DESC
                )
        );
        if(inspectResultList.isEmpty()){
            throw new NullPointerException("해당 페이지의 데이터가 존재하지 않습니다");
        }
        return inspectResultList;
    }

    public InspectResultGetDetailMapping inspectResultDetail(int inspectResultId){
        InspectResultGetDetailMapping result = inspectResultRepository.findAllByInspectBookId(inspectResultId);
        if (result == null){
            throw new RuntimeException("존재하지 않는 데이터입니다");
        }
        return result;
    }

    public InspectorReviewMapping getInspectReviewDetail(int inspectResultId){
        InspectorReviewMapping result = inspectorReviewRepository.findByStatusAndInspectResult_Id(BoardUtils.BOARD_DELETE_STATUS_FALSE, inspectResultId);
        return result;
    }

    public InspectorReview createInspectReview(InspectorReview inspectorReview){
//        InspectorReview form = inspectorReviewRepository.findById(inspectResultId).orElseThrow(()->
//                new RuntimeException("수리결과가 없습니다"));
//
//        if (inspectorReview.getAccount().getId().isBlank()) {
//            throw new RuntimeException("세션이 만료되었습니다");
//        }
//        Account account = accountRepository.findById(inspectorReview.getAccount().getId());
//        if (account == null){
//            throw new RuntimeException("존재하지 않는 아이디입니다");
//        }
//
//        Inspector inspector = inspectorRepository.findById(inspectorReview.getInspector().getId()).orElseThrow(()->
//                new RuntimeException("존재하지 않는 검수원입니다"));
//        inspectorReview.setInspectResult(form.getInspectResult());
//        inspectorReview.setInspector(form.getInspector());
        inspectorReview.setRegDt(LocalDateTime.now());
        inspectorReview.setUptDt(LocalDateTime.now());
        inspectorReview.setStatus(BoardUtils.BOARD_DELETE_STATUS_FALSE);
////
        InspectorReview save = inspectorReviewRepository.save(inspectorReview);
//        return save.getId();
        return save;
    }
}
