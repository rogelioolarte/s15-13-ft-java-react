DELIMITER //

CREATE PROCEDURE sp_getByDate(IN input_date VARCHAR(50))
BEGIN
    DECLARE search_date DATE;
    DECLARE error_message VARCHAR(255) DEFAULT '';
    DECLARE result_date DATE;

    -- Verificar el formato de fecha de entrada
    IF STR_TO_DATE(input_date, '%m/%d/%Y') IS NULL THEN
        SET error_message = 'Formato de fecha inválido. Use el formato MM/DD/YYYY.';
    ELSE
        -- Convertir la cadena de entrada a un valor de fecha
        SET search_date = STR_TO_DATE(input_date, '%m/%d/%Y');
        
        -- Asignar la fecha de búsqueda al resultado
        SET result_date = search_date;

        -- Realizar la consulta utilizando la fecha convertida
        SELECT
            s.id AS sale_id,
            c.name AS customer_name,
            c.personalcode AS customer_personalcode,
            sp.id_product,
            p.name AS product_name,
            sp.quantity,
            sp.discount,
            p.sale_price,
            t.id AS tax_id,
            t.name AS tax_name
        FROM
            sales s
            JOIN customer c ON s.id_customer = c.id
            JOIN sales_products sp ON s.id = sp.id_sales
            JOIN product p ON sp.id_product = p.id
            JOIN taxes t ON s.id_taxes = t.id
        WHERE
            s.date = search_date;
    END IF;

    -- Si hay un mensaje de error, mostrarlo junto con la fecha
    IF error_message <> '' THEN
        SELECT error_message AS error_message, result_date AS result_date;
    END IF;
END //

DELIMITER ;





----------------------------------------------


DELIMITER //

CREATE PROCEDURE sp_getByDateRange(IN start_date DATE, IN end_date DATE)
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
        s.total
    FROM
        sales s
        JOIN customer c ON s.id_customer = c.id
        JOIN sales_products sp ON s.id = sp.id_sales
        JOIN product p ON sp.id_product = p.id
        JOIN taxes t ON s.id_taxes = t.id
    WHERE
        s.date BETWEEN start_date AND end_date;
END //

DELIMITER ;


