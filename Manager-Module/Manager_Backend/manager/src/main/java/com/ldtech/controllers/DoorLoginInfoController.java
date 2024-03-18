package com.ldtech.controllers;

import com.ldtech.entities.DoorLoginInfo;
import com.ldtech.services.DoorLoginInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/doorLoginInfos")
public class DoorLoginInfoController {

    @Autowired
    private DoorLoginInfoService doorLoginInfoService;

    @PostMapping
    public ResponseEntity<DoorLoginInfo> createDoorLoginInfo(@RequestBody DoorLoginInfo doorLoginInfo) {
        DoorLoginInfo savedInfo = doorLoginInfoService.saveDoorLoginInfo(doorLoginInfo);
        return new ResponseEntity<>(savedInfo, HttpStatus.CREATED);
    }

    @GetMapping("/{employeeId}/{logDate}")
    public ResponseEntity<DoorLoginInfo> getDoorLoginInfoById(@PathVariable String employeeId, @PathVariable LocalDate logDate) {
        DoorLoginInfo info = doorLoginInfoService.getDoorLoginInfoById(employeeId, logDate);
        if (info != null) {
            return new ResponseEntity<>(info, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<List<DoorLoginInfo>> getAllDoorLoginInfos() {
        List<DoorLoginInfo> infos = doorLoginInfoService.getAllDoorLoginInfos();
        return new ResponseEntity<>(infos, HttpStatus.OK);
    }

    @DeleteMapping("/{employeeId}/{logDate}")
    public ResponseEntity<Void> deleteDoorLoginInfo(@PathVariable String employeeId, @PathVariable LocalDate logDate) {
        doorLoginInfoService.deleteDoorLoginInfo(employeeId, logDate);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
