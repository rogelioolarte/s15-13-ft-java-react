package com.stockmaster.controller;

import com.stockmaster.dto.customer.CustomerSavingRequest;
import com.stockmaster.dto.customer.CustomerUpdateRequest;
import com.stockmaster.entity.customer.Customer;
import com.stockmaster.service.customer.CustomerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/customer")
@RequiredArgsConstructor
@CrossOrigin
public class CustomerController {

    private final CustomerService customerService;
    //Metodos Get
    @GetMapping("/all-customer")
    public ResponseEntity<?> getAllCustomers() {
        return ResponseEntity.ok(customerService.findByAll());
    }
    //Para traer el customer por el sale
    /*
    @GetMapping("/sale/{id}")
    public ResponseEntity<?> getCustomerBySalesId(@PathVariable Long id){
        return ResponseEntity.ok(customerService.findBySaleId(id));
    }*/
    @GetMapping("/customer/{id}")
    public ResponseEntity<?> getCustomerByCustomerId(@PathVariable Long id) {
        return ResponseEntity.ok(customerService.findByCustomerId(id));
    }
    @GetMapping("/searchByCustomerName")
    public ResponseEntity<?> searchByCustomerName(@RequestParam("searchName") String searchTerm) {
        List<Customer> searchResult = customerService.searchCustomerByName(searchTerm);
        return ResponseEntity.ok(searchResult);
    }
    @GetMapping("/searchByCustomerPersonalCode")
    public ResponseEntity<?> searchByCustomerPersonalCode(@RequestParam("searchPersonalCode") String searchTerm) {
        List<Customer> searchResult = customerService.searchCustomerByPersonalCode(searchTerm);
        return ResponseEntity.ok(searchResult);
    }
    //Metodos Post
    @PostMapping("/save-customer")
    public ResponseEntity<?> saveCustomer(@Valid @RequestBody CustomerSavingRequest customer, BindingResult result){
        if (result.hasErrors()) {
            List<String> errorMessages = result.getAllErrors()
                    .stream()
                    .map(error -> error.getDefaultMessage())
                    .collect(Collectors.toList());
            return ResponseEntity.badRequest().body(errorMessages);
        }
        try {
            return ResponseEntity.ok(customerService.save(customer));
        } catch (DataIntegrityViolationException e) {
            if (e.getMessage().contains("Duplicate entry")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("El valor personalcode está duplicado. Por favor, proporcione un valor único.");
            }
            throw e;
        }
    }
    //Metodos Put
    @PutMapping("/update-customer")
    public ResponseEntity<?> updateCustomer(@Valid @RequestBody CustomerUpdateRequest customer) throws BadRequestException {
        return ResponseEntity.ok(customerService.update(customer));
    }
    //Metodo Delete
    @DeleteMapping("/deleteCustomer/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable Long id){
        customerService.delete(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }


}
