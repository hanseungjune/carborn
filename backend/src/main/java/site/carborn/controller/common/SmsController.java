package site.carborn.controller.common;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import site.carborn.entity.common.SmsAuth;
import site.carborn.service.common.MailService;
import site.carborn.service.common.SmsService;
import site.carborn.util.board.BoardUtils;
import site.carborn.util.network.NormalResponse;

import java.util.Random;

@Slf4j
@Tag(name = "SMS", description = "문자 인증 API")
@RequestMapping("/api")
@RestController
@RequiredArgsConstructor
public class SmsController {
    @Autowired
    SmsService smsService;

    @Autowired
    MailService mailService;

    @PostMapping("/sms-auth-send")
    public ResponseEntity<?> smsAuthSend(@RequestBody SmsAuth smsAuth) throws Exception {
        String phoneNm = smsAuth.getPhoneNm();
        if (phoneNm == null || phoneNm.isBlank()) {
            throw new NullPointerException("휴대전화 번호를 입력해주세요");
        }

        String receivePhone = smsAuth.getPhoneNm();
        Random random = new Random();
        StringBuilder authNm = new StringBuilder();
        for (int i = 0; i < 6; i++) {
            authNm.append((random.nextInt(10)));
        }

        String msg = smsService.makeSmsAuthMsg(receivePhone, authNm.toString());

        String to = "tmdwns950428@naver.com";
        String title = "";
        msg = String.format("인증번호 [%s]", authNm);

//        mailService.mailAuthSend(to, title, msg);
//        smsService.smsAuthSend(smsAuth, msg);
        return NormalResponse.toResponseEntity(HttpStatus.OK, BoardUtils.BOARD_CRUD_SUCCESS);
    }
}
