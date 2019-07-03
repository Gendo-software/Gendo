db.createUser(
        {
            user: "gendoc_readonly",
            pwd: "badger521",
            roles: [
                {
                    role: "readWrite",
                    db: "gendoc_db"
                }
            ]
        }
);

db.createCollection("templates");
db.createCollection("template_versions");