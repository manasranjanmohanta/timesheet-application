package com.ldtech.controllers;

import com.ldtech.services.HomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/v1/home")
public class HomeController {
    @Autowired
    private HomeService homeService;


    @GetMapping("status/accepted")
    public ResponseEntity<Integer> getAcceptedStatus(){
        int acceptedCount = homeService.searchByStatus("Accepted");
        return ResponseEntity.ok(acceptedCount);
    }


    @GetMapping("status/rejected")
    public ResponseEntity<Integer> getRejectedStatus(){
        int rejectedCount = homeService.searchByStatus("Rejected");
        return ResponseEntity.ok(rejectedCount);
    }


    @GetMapping("status/pending")
    public ResponseEntity<Integer> getPendingStatus(){
        int pendingCount = homeService.searchByStatus("Pending");
        return ResponseEntity.ok(pendingCount);
    }
}
