package com.ldtech.controllers;

import com.ldtech.dtos.DateRangeDTO;
import com.ldtech.payloads.HistoryResponse;
import com.ldtech.services.HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/history")
public class HistoryController {

    @Autowired
    private HistoryService historyService;

    @GetMapping
    public ResponseEntity<List<HistoryResponse>> getAllHistoryInfos(){
        List<HistoryResponse> responses = historyService.getAllHistory();
        return ResponseEntity.ok(responses);
    }

    @PostMapping("/rangedDate")
    public ResponseEntity<List<HistoryResponse>> getAllHistoryInfosWithRangedDate(@RequestBody DateRangeDTO dateRangeDTO){
        List<HistoryResponse> responses = historyService.getAllHistoryWithRangedDate(dateRangeDTO);
        return ResponseEntity.ok(responses);
    }

    @PostMapping("/id/{employeeId}")
    public ResponseEntity<List<HistoryResponse>> getAllHistoryInfosByEmployeeId(@PathVariable String employeeId, @RequestBody DateRangeDTO dateRangeDTO){
        List<HistoryResponse> responses = historyService.getAllHistoryByEmployeeId(employeeId, dateRangeDTO);
        return ResponseEntity.ok(responses);
    }

    @PostMapping("/name/{employeeName}")
    public ResponseEntity<List<HistoryResponse>> getAllHistoryInfosByEmployeeName(@PathVariable String employeeName, @RequestBody DateRangeDTO dateRangeDTO){
        List<HistoryResponse> responses = historyService.getAllHistoryByEmployeeName(employeeName, dateRangeDTO);
        return ResponseEntity.ok(responses);
    }

    @PostMapping("/status/{approvalStatus}")
    public ResponseEntity<List<HistoryResponse>> getAllHistoryInfosByApprovalStatus(@PathVariable String approvalStatus, @RequestBody DateRangeDTO dateRangeDTO){
        List<HistoryResponse> responses = historyService.getAllHistoryByApprovalStatus(approvalStatus, dateRangeDTO);
        return ResponseEntity.ok(responses);
    }



}
