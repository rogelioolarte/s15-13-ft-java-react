package com.stockmaster.repository;

import com.stockmaster.entity.sales.Sales;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SalesRepository extends JpaRepository<Sales, Long> {

    @Query(value = "CALL sp_getAllSales()", nativeQuery = true)
    List<Object[]> findAllSales();
    @Query(value = "CALL sp_getByDateRange(:startDate, :endDate)", nativeQuery = true)
    List<Object[]> findByDateRange(@Param("startDate") String startDate, @Param("endDate") String endDate);

    @Query(value = "SELECT DATE_FORMAT(date, '%Y-%m') AS month, SUM(total) AS total_sales FROM Sales GROUP BY DATE_FORMAT(date, '%Y-%m')", nativeQuery = true)
    List<Object[]> getTotalSalesByMonth();

}
