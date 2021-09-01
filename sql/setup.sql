-- -------------- --
-- DATABASE SETUP --
-- -------------- --

DROP TABLE IF EXISTS booking_policy_times;
DROP TABLE IF EXISTS reservation;
DROP TABLE IF EXISTS room;
DROP TABLE IF EXISTS booking_policy;
DROP TABLE IF EXISTS building;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS organization;

CREATE TABLE organization (
     organization_id      INT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE,
     organization_name    VARCHAR(255) UNIQUE NOT NULL,
     organization_number  CHAR (9) NOT NULL,
     organization_address VARCHAR(255),
     postal_code          CHAR(4) NOT NULL,
     postal_zone          VARCHAR(255) NOT NULL,
     contact_name         VARCHAR(255),
     PRIMARY KEY (organization_id)
);

CREATE TABLE user (
     user_id           INT UNSIGNED NOT NULL AUTO_INCREMENT,
     role              VARCHAR(8) DEFAULT 'user',
     email             VARCHAR(255) NOT NULL UNIQUE,
     first_name        VARCHAR(255) DEFAULT NULL,
     last_name         VARCHAR(255) NOT NULL,
     hashed_password   CHAR(60) DEFAULT NULL,
     token_version     INT DEFAULT '0',
     secret_token      CHAR(64) DEFAULT NULL,
     two_factor        BOOLEAN DEFAULT '0',
     two_factor_method VARCHAR(5) DEFAULT NULL,
     is_active         BOOLEAN DEFAULT '1' NOT NULL,
     organization_id   INT UNSIGNED DEFAULT NULL,
     PRIMARY KEY (user_id),
     FOREIGN KEY (organization_id) REFERENCES organization(organization_id) ON DELETE CASCADE
  );

CREATE TABLE building (
     building_id        INT UNSIGNED NOT NULL AUTO_INCREMENT,
     building_name      VARCHAR(255) NOT NULL,
     organization_id    INT UNSIGNED DEFAULT NULL,
     building_is_active BOOLEAN DEFAULT '1' NOT NULL,
     PRIMARY KEY (building_id),
     FOREIGN KEY (organization_id) REFERENCES organization(organization_id) ON DELETE CASCADE
  );

CREATE TABLE booking_policy (
     policy_id                INT UNSIGNED NOT NULL AUTO_INCREMENT,
     max_time_per_reservation TINYINT UNSIGNED NOT NULL,
     max_days_lookup          TINYINT UNSIGNED NOT NULL,
     length_period            TINYINT UNSIGNED NOT NULL,
     reservations_per_period  TINYINT UNSIGNED NOT NULL,
     organization_id          INT UNSIGNED DEFAULT NULL,
     PRIMARY KEY (policy_id),
     FOREIGN KEY (organization_id) REFERENCES organization(organization_id) ON DELETE CASCADE
  );

CREATE TABLE room (
     room_id         INT UNSIGNED NOT NULL AUTO_INCREMENT,
     room_name       VARCHAR(255) NOT NULL,
     size            TINYINT UNSIGNED,
     is_active       BOOLEAN DEFAULT '1' NOT NULL,
     building_id     INT UNSIGNED NOT NULL,
     organization_id INT UNSIGNED DEFAULT NULL,
     PRIMARY KEY (room_id),
     FOREIGN KEY (building_id) REFERENCES building(building_id) ON DELETE CASCADE,
     FOREIGN KEY (organization_id) REFERENCES organization(organization_id) ON DELETE CASCADE
  );

CREATE TABLE reservation (
     res_id  INT UNSIGNED NOT NULL AUTO_INCREMENT,
     start   DATETIME NOT NULL,
     end     DATETIME NOT NULL,
     room_id INT UNSIGNED NOT NULL,
     user_id INT UNSIGNED NOT NULL,
     PRIMARY KEY (res_id),
     FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
     FOREIGN KEY (room_id) REFERENCES room(room_id) ON DELETE CASCADE
  );

CREATE TABLE booking_policy_times (
     start_mon   VARCHAR(10) NOT NULL,
     end_mon     VARCHAR(10) NOT NULL,
     start_tue   VARCHAR(10) NOT NULL,
     end_tue     VARCHAR(10) NOT NULL,
     start_wed   VARCHAR(10) NOT NULL,
     end_wed     VARCHAR(10) NOT NULL,
     start_thu   VARCHAR(10) NOT NULL,
     end_thu     VARCHAR(10) NOT NULL,
     start_fri   VARCHAR(10) NOT NULL,
     end_fri     VARCHAR(10) NOT NULL,
     start_sat   VARCHAR(10) NOT NULL,
     end_sat     VARCHAR(10) NOT NULL,
     start_sun   VARCHAR(10) NOT NULL,
     end_sun     VARCHAR(10) NOT NULL,
     building_id INT UNSIGNED NOT NULL,
     PRIMARY KEY (building_id),
     FOREIGN KEY (building_id) REFERENCES building(building_id) ON DELETE CASCADE
  );