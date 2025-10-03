package com.todo.model;

import com.todo.util.enums.TaskPriority;
import com.todo.util.enums.TaskStatus;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Todos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String title;
    private String description;
    @Enumerated(EnumType.STRING)
    private TaskStatus status;
    @Enumerated(EnumType.STRING)
    private TaskPriority priority;
    private LocalDateTime createdAt;
    private LocalDateTime expireDate;
    private LocalDateTime originalExpireDate;
    private LocalDateTime lastExtendedDate;
    private Integer extensionCount;

    @ElementCollection
    @CollectionTable(name = "task_tags", joinColumns = @JoinColumn(name = "task_id"))
    @Column(name = "tag")
    private List<String> tags = new ArrayList<>();
    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;

    public Todos() {
    }

    public Todos(long id, String title, String description, TaskStatus status,
                 TaskPriority priority, LocalDateTime createdAt,
                 LocalDateTime expireDate, LocalDateTime originalExpireDate) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.priority = priority;
        this.createdAt = createdAt;
        this.expireDate = expireDate;
        this.originalExpireDate = originalExpireDate;
    }

    // Getters and Setters
    public long getId() {
        return id;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
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

    // Helper methods
    public void addTag(String tag) {
        this.tags.add(tag);
    }

    public void removeTag(String tag) {
        this.tags.remove(tag);
    }

    public void incrementExtensionCount() {
        this.extensionCount++;
        this.lastExtendedDate = LocalDateTime.now();
    }

    @Override
    public String toString() {
        return "Task{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", status=" + status +
                ", priority=" + priority +
                ", createdAt=" + createdAt +
                '}';
    }
}

