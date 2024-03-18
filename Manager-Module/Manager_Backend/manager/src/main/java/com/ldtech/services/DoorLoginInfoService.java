package com.ldtech.services;

import com.ldtech.entities.DoorLoginInfo;

import java.time.LocalDate;
import java.util.List;

public interface DoorLoginInfoService {
    DoorLoginInfo saveDoorLoginInfo(DoorLoginInfo doorLoginInfo);
    DoorLoginInfo getDoorLoginInfoById(String employeeId, LocalDate logDate);
    List<DoorLoginInfo> getAllDoorLoginInfos();
    void deleteDoorLoginInfo(String employeeId, LocalDate logDate);
}
