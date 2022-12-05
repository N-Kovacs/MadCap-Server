INSERT INTO games (url, seed)
VALUES
('g45th', FLOOR(RANDOM() * 20000 + 1)),
('e45r6', FLOOR(RANDOM() * 20000 + 1));

INSERT INTO categories_sets (game_id, category_id)
VALUES
(1, 1),
(2, 3),
(2, 4);