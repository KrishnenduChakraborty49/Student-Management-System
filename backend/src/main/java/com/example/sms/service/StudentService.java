package com.example.sms.service;

import com.example.sms.dto.request.StudentRequest;
import com.example.sms.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface StudentService {
    Student createStudent(StudentRequest request);
    Student updateStudent(Long id, StudentRequest request);
    void deleteStudent(Long id);
    Student getStudentById(Long id);
    Page<Student> getAllStudents(Pageable pageable);
    Page<Student> searchStudents(String keyword, Pageable pageable);
}
