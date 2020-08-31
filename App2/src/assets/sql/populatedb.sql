CREATE TABLE IF NOT EXISTS developer(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT,
	skill TEXT,
	yearsOfExperience INTEGER,
	icon TEXT
);
INSERT INTO developer(name, skill, yearsOfExperience, icon) VALUES ('Simon', 'Ionic', '4', 'wifi');
INSERT INTO developer(name, skill, yearsOfExperience, icon) VALUES ('Jorge', 'Firebase', '2', 'beer');
INSERT INTO developer(name, skill, yearsOfExperience, icon) VALUES ('Max', 'Startup', '5', 'info');
