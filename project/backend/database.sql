-- import to SQLite by running: sqlite3.exe db.sqlite3 -init sqlite.sql
PRAGMA journal_mode = MEMORY;
PRAGMA synchronous = OFF;
PRAGMA foreign_keys = OFF;
PRAGMA ignore_check_constraints = OFF;
PRAGMA auto_vacuum = NONE;
PRAGMA secure_delete = OFF;
BEGIN TRANSACTION;
CREATE TABLE `account`(
	`id` INTEGER PRIMARY KEY AUTOINCREMENT,
	`firstname` TEXT NOT NULL,
	`lastname` TEXT NOT NULL,
	`balance` FLOAT NOT NULL,
	`email` TEXT NOT NULL UNIQUE,
	`password` TEXT NOT NULL
);
CREATE TABLE `user_stock`(
	`id` INTEGER PRIMARY KEY AUTOINCREMENT,
	`amount` INT NOT NULL,
	`buy` FLOAT NOT NULL,
	`sell` FLOAT NOT NULL,
	`stock` TEXT NOT NULL,
	`user` INT NOT NULL,
	FOREIGN KEY(`user`) REFERENCES `account`(`id`),
	FOREIGN KEY(`stock`) REFERENCES `stock`(`symbol`)
);
CREATE TABLE `stock`(
	`symbol` TEXT PRIMARY KEY NOT NULL,
	`name` TEXT NOT NULL,
	`sector` TEXT NOT NULL,
	`description` TEXT NOT NULL
);
CREATE TABLE `time_series`(
	`date` TEXT NOT NULL,
	`symbol` TEXT NOT NULL,
	`open` FLOAT NOT NULL,
	`high` FLOAT NOT NULL,
	`low` FLOAT NOT NULL,
	`close` FLOAT NOT NULL,
	`volume` FLOAT NOT NULL,
	PRIMARY KEY (`date`, `symbol`),
	FOREIGN KEY(`symbol`) REFERENCES `stock`(`symbol`)
);
COMMIT;
PRAGMA ignore_check_constraints = ON;
PRAGMA foreign_keys = ON;
PRAGMA journal_mode = WAL;
PRAGMA synchronous = NORMAL;