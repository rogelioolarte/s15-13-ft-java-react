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
    List<Object[]> findByDate(@Param("date") String date);

    @Query(value = "CALL sp_getByDateRange(:startDate, :endDate)", nativeQuery = true)
    List<Object[]> findByDateRange(@Param("startDate") String startDate, @Param("endDate") String endDate);

}
