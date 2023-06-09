package site.carborn.repository.company;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import site.carborn.entity.company.InsuranceCompany;
import site.carborn.mapping.company.InsuranceCompanyGetIdMapping;

@Repository
public interface InsuranceCompanyRepository extends JpaRepository<InsuranceCompany, Integer> {
    InsuranceCompanyGetIdMapping findByAccount_Id(String account_Id);
}
