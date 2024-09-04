// package com.admin.back.service.implement;

// import java.io.IOException;
// import java.util.List;
// import java.util.Map;

// import org.apache.commons.collections4.map.HashedMap;
// import org.springframework.stereotype.Service;

// import com.admin.back.dto.LogDataContainer;
// import com.admin.back.dto.LoginData;
// import com.admin.back.dto.OrderData;
// import com.admin.back.dto.RegistrationData;
// import com.admin.back.service.service.LogService;
// import com.admin.back.util.LogParser;

// import lombok.RequiredArgsConstructor;

// @Service
// @RequiredArgsConstructor
// public class LogServiceImpl implements LogService{
//     private final LogParser logParser;

//     @Override
//     public LogDataContainer loadLogData(String filePath) throws IOException {
//         return logParser.parseLog(filePath);
//     }

//     @Override
//     public LogDataContainer getLogData() {
//         return logParser.getLogData();
//     }
//     @Override
//     public List<LoginData> getLogins() {
//         return logParser.getLogins();
//     }

//     @Override
//     public List<RegistrationData> getRegistrations() {
//         return logParser.getRegistrations();
//     }

//     @Override
//     public List<OrderData> getOrders() {
//         return logParser.getOrders();
//     }

//     @Override
//     public Map<String, Long> generateStatistics() {
//         Map<String, Long> stats = new HashedMap<>();

//         stats.put("totalLogins", (long) logParser.getLogins().size());
//         stats.put("totalRegistrations", (long) logParser.getRegistrations().size());
//         stats.put("totalOrders", (long) logParser.getOrders().size());
//         return stats;
//     }
    
// }
