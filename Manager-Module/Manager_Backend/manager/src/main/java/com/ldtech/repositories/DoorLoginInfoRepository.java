package com.ldtech.repositories;

import com.ldtech.entities.DoorLoginInfo;
import com.ldtech.entities.DoorLoginInfoId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoorLoginInfoRepository extends JpaRepository<DoorLoginInfo, DoorLoginInfoId> {
    // You can add custom query methods here if needed
}
