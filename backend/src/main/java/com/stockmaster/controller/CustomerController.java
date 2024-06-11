package com.stockmaster.controller;

import com.stockmaster.dto.customer.CustomerSavingRequest;
import com.stockmaster.dto.customer.CustomerUpdateRequest;
import com.stockmaster.entity.customer.Customer;
import com.stockmaster.entity.customer.CustomerType;
import com.stockmaster.exception.RequestException;
import com.stockmaster.repository.CustomerRepository;
import com.stockmaster.service.customer.CustomerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/customer")
@RequiredArgsConstructor

@CrossOrigin("*")
public class CustomerController {

    private final CustomerService customerService;
    private final CustomerRepository customerRepository;

    //Metodos Get
    @GetMapping("/all")
    public ResponseEntity<?> getAllCustomers() {
        return ResponseEntity.ok(customerService.findByAll());
    }
    @GetMapping("/{id}")
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
    @PostMapping
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
        } catch (IllegalArgumentException e) {
            String errorMessage = e.getMessage();
            if (errorMessage.contains("Invalid customer type")) {
                // Construir un mensaje más específico
                String acceptedValues = Arrays.stream(CustomerType.values())
                        .map(Enum::name)
                        .collect(Collectors.joining(", "));
                errorMessage = String.format("Invalid value for customer type. Accepted values are: [%s]", acceptedValues);
            }
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", errorMessage));
        }
    }
    //Metodos Put
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCustomer(@PathVariable Long id, @Valid @RequestBody CustomerUpdateRequest customer) throws BadRequestException {
        return ResponseEntity.ok(customerService.update(id, customer));
    }
    //Metodo Patch
    @PatchMapping("/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable Long id){
        customerService.delete(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }
//    @PatchMapping("/enable/{id}")
//    public ResponseEntity<?> enableCustomer(@PathVariable Long id){
//        customerService.activate(id);
//        return ResponseEntity.ok(HttpStatus.OK);
//    }
}
