package com.stockmaster.controller;

import com.stockmaster.dto.customer.CustomerSavingRequest;
import com.stockmaster.dto.customer.CustomerUpdateRequest;
import com.stockmaster.entity.customer.Customer;
import com.stockmaster.repository.CustomerRepository;
import com.stockmaster.service.customer.CustomerService;
import io.swagger.annotations.Api;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/customer")
@RequiredArgsConstructor

@CrossOrigin("*")
public class CustomerController {

    private final CustomerService customerService;
    private final CustomerRepository customerRepository;

    //Metodos Get
    @GetMapping("/allcustomer")
    public ResponseEntity<?> getAllCustomers() {
        return ResponseEntity.ok(customerService.findByAll());
    }
    @GetMapping("/allactive")
    public ResponseEntity<?> getActiveCustomers() {
        List<Customer> customers = customerRepository.findAllActive();
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    @GetMapping("/findby/{id}")
    public ResponseEntity<?> getCustomerByCustomerId(@PathVariable Long id) {
        return ResponseEntity.ok(customerService.findByCustomerId(id));
    }
    @GetMapping("/searchbyname/")
    public ResponseEntity<?> searchByCustomerName(@RequestParam("searchName") String searchTerm) {
        List<Customer> searchResult = customerService.searchCustomerByName(searchTerm);
        return ResponseEntity.ok(searchResult);
    }
    @GetMapping("/searchbypersonalcode/")
    public ResponseEntity<?> searchByCustomerPersonalCode(@RequestParam("searchPersonalCode") String searchTerm) {
        List<Customer> searchResult = customerService.searchCustomerByPersonalCode(searchTerm);
        return ResponseEntity.ok(searchResult);
    }
    //Metodos Post
    @PostMapping("/savecustomer")
    public ResponseEntity<?> saveCustomer(@Valid @RequestBody CustomerSavingRequest customer, BindingResult result){
        if (result.hasErrors()) {
            List<String> errorMessages = result.getAllErrors()
                    .stream()
                    .map(error -> error.getDefaultMessage())
                    .collect(Collectors.toList());
            return ResponseEntity.badRequest().body(errorMessages);
        }
        customerService.save(customer);  // Aquí se lanzará la CustomRequestException si hay un error
        return ResponseEntity.ok(Map.of("message", "Customer saved successfully"));
    }
    //Metodos Put
    @PutMapping("/updatecustomer")
    public ResponseEntity<?> updateCustomer(@Valid @RequestBody CustomerUpdateRequest customer) throws BadRequestException {
        return ResponseEntity.ok(customerService.update(customer));
    }
    //Metodo Patch
    @PatchMapping("/deletecustomer/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable Long id){
        customerService.delete(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }
    @PatchMapping("/enable/{id}")
    public ResponseEntity<?> enableCustomer(@PathVariable Long id){
        customerService.activate(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
