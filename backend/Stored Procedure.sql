CREATE PROCEDURE `sp_getAllSales`()
BEGIN
    SELECT
        s.id AS sale_id,
        c.name AS customer_name,
        c.personalcode AS customer_personalcode,
        p.name AS product_name,
        sp.quantity,
        sp.discount,
        p.sale_price AS price,
        t.name AS tax_name,
        t.percentage AS tax_percentage,
        s.total,
        DATE_FORMAT(s.date, '%m/%d/%Y') AS formatted_sale_date,
        p.description AS product_description,
        p.barcode AS product_barcode,
        p.stock AS product_stock
    FROM
        sales s
        JOIN customer c ON s.id_customer = c.id
        JOIN sales_products sp ON s.id = sp.id_sales
        JOIN product p ON sp.id_product = p.id
        JOIN (
            SELECT
                s.id,
                MAX(t.name) AS name,
                MAX(t.percentage) AS percentage
            FROM
                sales s
                JOIN taxes t ON s.id_taxes = t.id
            GROUP BY
                s.id
        ) t ON s.id = t.id
    ORDER BY
        s.id;
END



-----------------------------------------------------------


CREATE  PROCEDURE `sp_getByDateRange`(IN start_date DATE, IN end_date DATE)
BEGIN
    SELECT
        s.id AS sale_id,
        c.name AS customer_name,
        c.personalcode AS customer_personalcode,
        p.name AS product_name,
        sp.quantity,
        sp.discount,
        p.sale_price AS price,
        t.name AS tax_name,
        t.percentage AS tax_percentage, -- Agregado
        s.total,
        DATE_FORMAT(s.date, '%m/%d/%Y') AS formatted_sale_date,
        p.description AS product_description,
        p.barcode AS product_barcode,
        p.stock AS product_stock
    FROM
        sales s
        JOIN customer c ON s.id_customer = c.id
        JOIN sales_products sp ON s.id = sp.id_sales
        JOIN product p ON sp.id_product = p.id
        JOIN (
            SELECT
                s.id,
                MAX(t.name) AS name,
                MAX(t.percentage) AS percentage
            FROM
                sales s
                JOIN taxes t ON s.id_taxes = t.id
            GROUP BY
                s.id
        ) t ON s.id = t.id
    WHERE
        s.date BETWEEN start_date AND end_date;
END