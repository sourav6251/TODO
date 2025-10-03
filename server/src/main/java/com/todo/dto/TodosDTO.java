package com.todo.dto;

import com.todo.util.enums.TaskPriority;
import com.todo.util.enums.TaskStatus;

import java.time.LocalDateTime;
import java.util.List;

public class TodosDTO {
    private long id;
    private String title;
    private String description;
    private TaskStatus status;
    private TaskPriority priority;
    private LocalDateTime createdAt;
    private LocalDateTime expireDate;
    private LocalDateTime originalExpireDate;
    private LocalDateTime lastExtendedDate;
    private Integer extensionCount;
    private List<String> tags; // = new ArrayList<>();
    private long userId;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    public TaskPriority getPriority() {
        return priority;
    }

    public void setPriority(TaskPriority priority) {
        this.priority = priority;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getExpireDate() {
        return expireDate;
    }

    public void setExpireDate(LocalDateTime expireDate) {
        this.expireDate = expireDate;
    }

    public LocalDateTime getOriginalExpireDate() {
        return originalExpireDate;
    }

    public void setOriginalExpireDate(LocalDateTime originalExpireDate) {
        this.originalExpireDate = originalExpireDate;
    }

    public LocalDateTime getLastExtendedDate() {
        return lastExtendedDate;
    }

    public void setLastExtendedDate(LocalDateTime lastExtendedDate) {
        this.lastExtendedDate = lastExtendedDate;
    }

    public Integer getExtensionCount() {
        return extensionCount;
    }

    public void setExtensionCount(Integer extensionCount) {
        this.extensionCount = extensionCount;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public long getUser() {
        return userId;
    }

    public void setUser(long user) {
        this.userId = user;
    }

    public TodosDTO() {
    }
    public TodosDTO(long id, String title, String description, TaskStatus status,
                    TaskPriority priority, LocalDateTime createdAt,
                    LocalDateTime expireDate, LocalDateTime originalExpireDate,
                    LocalDateTime lastExtendedDate, Integer extensionCount,
                    long user) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.priority = priority;
        this.createdAt = createdAt;
        this.expireDate = expireDate;
        this.originalExpireDate = originalExpireDate;
        this.lastExtendedDate = lastExtendedDate;
        this.extensionCount = extensionCount;
        this.userId = user;
    }
}
