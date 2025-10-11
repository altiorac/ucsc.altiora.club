ALTER TABLE applications
    ADD COLUMN updated_at integer NOT NULL DEFAULT (strftime('%s', 'now') * 1000);

UPDATE applications
    SET updated_at = COALESCE(created_at, (strftime('%s', 'now') * 1000));
