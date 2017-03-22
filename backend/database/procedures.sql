delimiter //
CREATE PROCEDURE deleteUser(uid int(10))
BEGIN
	DELETE FROM event WHERE user_id = uid;
	DELETE FROM logs WHERE user_id = uid;
	DELETE FROM team_players WHERE user_id = uid;
	DELETE FROM user_interests WHERE user_id = uid;
	DELETE FROM user WHERE username LIKE uname;
END //
delimiter ;