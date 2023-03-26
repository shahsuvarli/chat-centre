<div className="chats-container">
        {people
          .filter((person) =>
            person.username
              // .concat(` ${person.surname}`)
              .toLowerCase()
              .includes(search)
          )
          .sort((a, b) => {
            return a.username.localeCompare(b.username);
          })
          // .sort((a, b) => {
          //   return b.messages[b.messages.length - 1].timestamp.localeCompare(
          //     a.messages[a.messages.length - 1].timestamp
          //   );
          // })
          .map((person) => {
            return (
              <Box
                className="chat-card"
                key={person.id}
                onClick={() => handleUser(person)}
              >
                <Avatar sx={{ width: 50, height: 50 }} src={person.image} />
                <div className="menu-chat-body">
                  <div>
                    <Typography variant="body1">{person.username}</Typography>
                    <Typography color="#677782" fontSize={13}>
                      {/* {person.messages[
                        person.messages.length - 1
                      ].timestamp.slice(11, 16)} */}
                      *time*
                    </Typography>
                  </div>
                  <Typography
                    color="#677782"
                    fontSize={15}
                    variant="body1"
                    className="message"
                    textAlign={"left"}
                  >
                    {/* {person.messages[person.messages.length - 1].text} */}
                    *last message*
                  </Typography>
                </div>
              </Box>
            );
          })}
      </div>