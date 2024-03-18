package com.ldtech.services;

import com.ldtech.dtos.DateRangeDTO;
import com.ldtech.payloads.HistoryResponse;

import java.util.List;

public interface HistoryService {
    List<HistoryResponse> getAllHistory();

    List<HistoryResponse> getAllHistoryWithRangedDate(DateRangeDTO dateRangeDTO);

    List<HistoryResponse> getAllHistoryByEmployeeId(String employeeId, DateRangeDTO dateRangeDTO);

    List<HistoryResponse> getAllHistoryByEmployeeName(String employeeName, DateRangeDTO dateRangeDTO);

    List<HistoryResponse> getAllHistoryByApprovalStatus(String approvalStatus, DateRangeDTO dateRangeDTO);
}
