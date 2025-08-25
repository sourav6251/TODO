package com.todo.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Value;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.TimeZone;

@RestController
@RequestMapping("/api/webhooks")
public class WebhookController {

    @Value("${clerk.webhook.secret}")
    private String webhookSecret;// = "whsec_cQ9Pa/WSdkQ0n/z2e7ZZOR1emyV3izbI";


    private final ObjectMapper objectMapper = new ObjectMapper();

    // Assuming you have a service to handle user operations
    // @Autowired
    // private UserService userService;

    @PostMapping("/clerk")
    public ResponseEntity<String> handleClerkWebhook(
            @RequestBody String payload,
            @RequestHeader("svix-id") String svixId,
            @RequestHeader("svix-timestamp") String svixTimestamp,
            @RequestHeader("svix-signature") String svixSignature) {
        System.out.println("svixSignature=> "+svixSignature);

        try {
            // Verify webhook signature for security
            if (!isValidSignature(svixId, svixTimestamp, payload, svixSignature, webhookSecret)) {
                return ResponseEntity.status(401).body("Invalid signature");
            }

            // Parse JSON payload
            JsonNode rootNode = objectMapper.readTree(payload);
            String eventType = rootNode.get("type").asText();
            JsonNode userData = rootNode.get("data");

            // Handle different event types
            switch (eventType) {
                case "user.created":
                    UserInfo createdUser = extractUserInfo(userData);
                    processUserCreation(createdUser);
                    break;

                case "user.updated":
                    UserInfo updatedUser = extractUserInfo(userData);
                    processUserUpdate(updatedUser);
                    break;

                case "user.deleted":
                    String deletedUserId = userData.get("id").asText();
                    processUserDeletion(deletedUserId);
                    break;

                default:
                    System.out.println("Unhandled event type: " + eventType);
                    break;
            }

            return ResponseEntity.ok("Webhook processed successfully");

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error processing webhook: " + e.getMessage());
        }
    }

    // Method to extract user information from the JSON data
    private UserInfo extractUserInfo(JsonNode userData) {
        UserInfo userInfo = new UserInfo();

        // Extract userId
        userInfo.setUserId(userData.get("id").asText());

        // Extract name (first_name + last_name)
        String firstName = userData.has("first_name") && !userData.get("first_name").isNull()
                ? userData.get("first_name").asText() : "";
        String lastName = userData.has("last_name") && !userData.get("last_name").isNull()
                ? userData.get("last_name").asText() : "";
        userInfo.setName((firstName + " " + lastName).trim());

        // Extract email
        userInfo.setEmail(extractPrimaryEmail(userData));

        // Extract createdAt (convert from Unix timestamp to LocalDateTime)
        long createdAtTimestamp = userData.get("created_at").asLong();
        userInfo.setCreatedAt(convertTimestampToLocalDateTime(createdAtTimestamp));

        // Extract updatedAt if available
        if (userData.has("updated_at") && !userData.get("updated_at").isNull()) {
            long updatedAtTimestamp = userData.get("updated_at").asLong();
            userInfo.setUpdatedAt(convertTimestampToLocalDateTime(updatedAtTimestamp));
        }

        // Extract additional information if needed
        userInfo.setUsername(userData.has("username") && !userData.get("username").isNull()
                ? userData.get("username").asText() : "");

        userInfo.setProfileImageUrl(userData.has("profile_image_url")
                ? userData.get("profile_image_url").asText() : "");

        return userInfo;
    }

    // Helper method to extract primary email
    private String extractPrimaryEmail(JsonNode userData) {
        // Check if primary_email_address_id exists and find the matching email
        if (userData.has("primary_email_address_id") && !userData.get("primary_email_address_id").isNull()) {
            String primaryEmailId = userData.get("primary_email_address_id").asText();

            if (userData.has("email_addresses") && userData.get("email_addresses").isArray()) {
                JsonNode emailAddresses = userData.get("email_addresses");
                for (JsonNode emailNode : emailAddresses) {
                    if (emailNode.has("id") && primaryEmailId.equals(emailNode.get("id").asText()) &&
                            emailNode.has("email_address")) {
                        return emailNode.get("email_address").asText();
                    }
                }
            }
        }

        // Fallback: return the first email if primary not found
        if (userData.has("email_addresses") && userData.get("email_addresses").isArray()) {
            JsonNode emailAddresses = userData.get("email_addresses");
            for (JsonNode emailNode : emailAddresses) {
                if (emailNode.has("email_address")) {
                    return emailNode.get("email_address").asText();
                }
            }
        }

        return "";
    }

    // Helper method to convert Unix timestamp to LocalDateTime
    private LocalDateTime convertTimestampToLocalDateTime(long timestamp) {
        return LocalDateTime.ofInstant(
                Instant.ofEpochMilli(timestamp),
                TimeZone.getDefault().toZoneId()
        );
    }

    // Process user creation
    private void processUserCreation(UserInfo userInfo) {
        System.out.println("=== PROCESSING USER CREATION ===");
        System.out.println("User ID: " + userInfo.getUserId());
        System.out.println("Name: " + userInfo.getName());
        System.out.println("Email: " + userInfo.getEmail());
        System.out.println("Created At: " + userInfo.getCreatedAt());
        System.out.println("Username: " + userInfo.getUsername());
        System.out.println("Profile Image: " + userInfo.getProfileImageUrl());

        // Save to database
        // userService.createUser(userInfo);
    }

    // Process user update
    private void processUserUpdate(UserInfo userInfo) {
        System.out.println("=== PROCESSING USER UPDATE ===");
        System.out.println("User ID: " + userInfo.getUserId());
        System.out.println("Name: " + userInfo.getName());
        System.out.println("Email: " + userInfo.getEmail());
        System.out.println("Updated At: " + userInfo.getUpdatedAt());
        System.out.println("Username: " + userInfo.getUsername());
        System.out.println("Profile Image: " + userInfo.getProfileImageUrl());

        // Update in database
        // userService.updateUser(userInfo);
    }

    // Process user deletion
    private void processUserDeletion(String userId) {
        System.out.println("=== PROCESSING USER DELETION ===");
        System.out.println("User ID: " + userId);
    }

    private boolean isValidSignature(String id, String timestamp, String payload,
                                     String signature, String secret) {
        try {
            String signedContent = id + "." + timestamp + "." + payload;
            System.out.println("Signed Content: " + signedContent);

            // Clerk's secret is Base64-encoded. Decode it first!
            byte[] decodedSecret = Base64.getDecoder().decode(secret.replace("whsec_", ""));

            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec keySpec = new SecretKeySpec(decodedSecret, "HmacSHA256");
            mac.init(keySpec);
            byte[] signatureBytes = mac.doFinal(signedContent.getBytes(StandardCharsets.UTF_8));

            String computedSignature = "v1," + Base64.getEncoder().encodeToString(signatureBytes);

            System.out.println("Computed Signature: " + computedSignature);
            System.out.println("Incoming Signature: " + signature);

            // Clerk can send multiple signatures (comma-separated). Check all.
            for (String sig : signature.split(" ")) {
                if (computedSignature.equals(sig.trim())) {
                    return true;
                }
            }

            return false;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }



    private String bytesToHex(byte[] bytes) {
        StringBuilder result = new StringBuilder();
        for (byte b : bytes) {
            result.append(String.format("%02x", b));
        }
        return result.toString();
    }

    // DTO class to hold extracted user information
    public static class UserInfo {
        private String userId;
        private String name;
        private String email;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        private String username;
        private String profileImageUrl;

        // Getters and Setters
        public String getUserId() { return userId; }
        public void setUserId(String userId) { this.userId = userId; }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public LocalDateTime getCreatedAt() { return createdAt; }
        public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

        public LocalDateTime getUpdatedAt() { return updatedAt; }
        public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }

        public String getProfileImageUrl() { return profileImageUrl; }
        public void setProfileImageUrl(String profileImageUrl) { this.profileImageUrl = profileImageUrl; }

        @Override
        public String toString() {
            return "UserInfo{" +
                    "userId='" + userId + '\'' +
                    ", name='" + name + '\'' +
                    ", email='" + email + '\'' +
                    ", createdAt=" + createdAt +
                    ", updatedAt=" + updatedAt +
                    ", username='" + username + '\'' +
                    ", profileImageUrl='" + profileImageUrl + '\'' +
                    '}';
        }
    }
}