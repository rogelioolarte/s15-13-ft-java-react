package com.stockmaster.repository;

import com.stockmaster.dto.sales.SalesDateResponse;
import com.stockmaster.entity.customer.Customer;
import com.stockmaster.entity.sales.Sales;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface SalesRepository extends JpaRepository<Sales, Long> {

    @Query(value = "CALL sp_getByDate(:date)", nativeQuery = true)
    List<SalesDateResponse> findByDate(@Param("date") Date date);
}
