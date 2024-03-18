package com.ldtech.services.impl;

import com.ldtech.entities.DoorLoginInfo;
import com.ldtech.entities.DoorLoginInfoId;
import com.ldtech.repositories.DoorLoginInfoRepository;
import com.ldtech.services.DoorLoginInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class DoorLoginInfoServiceImpl implements DoorLoginInfoService {

    @Autowired
    private DoorLoginInfoRepository doorLoginInfoRepository;

    @Override
    public DoorLoginInfo saveDoorLoginInfo(DoorLoginInfo doorLoginInfo) {
        return doorLoginInfoRepository.save(doorLoginInfo);
    }

    @Override
    public DoorLoginInfo getDoorLoginInfoById(String employeeId, LocalDate logDate) {
        DoorLoginInfoId id = new DoorLoginInfoId();
        id.setEmployeeId(employeeId);
        id.setLogDate(logDate);
        return doorLoginInfoRepository.findById(id).orElse(null);
    }

    @Override
    public List<DoorLoginInfo> getAllDoorLoginInfos() {
        return doorLoginInfoRepository.findAll();
    }

    @Override
    public void deleteDoorLoginInfo(String employeeId, LocalDate logDate) {
        DoorLoginInfoId id = new DoorLoginInfoId();
        id.setEmployeeId(employeeId);
        id.setLogDate(logDate);
        doorLoginInfoRepository.deleteById(id);
    }
}
