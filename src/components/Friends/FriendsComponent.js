import React, { useMemo } from 'react';
import { Flex, Box, Text } from '@chakra-ui/core';
import FriendDetails from './FriendDetails';

const FriendsComponent = (props) => {
    let { selfUser, users } = props;
    const selfDetails = useMemo(() => <FriendDetails editable user={selfUser}/>,[selfUser]);
    return (
        <Flex h='100%' direction='column' bg='darkestColor' color='lightColor'>
            <Flex h='30%' align='center' pl='20px'>
                <Text fontSize='20px' fontFamily='primary'>Participants</Text>
            </Flex>
            <Flex h='70%' pl='20px'>
                { selfUser ? selfDetails : ''}
                {/* selfUser coming as otherUser here */}
                {users && users.map(user => {
                    return (
                        <FriendDetails key={user.id} user={user}/>
                    )
                })}
            </Flex>
        </Flex>
    );
}

export default FriendsComponent;
// {users && users.map(user => {
//     return (
//         <div key={user.id}>
//             <h2 key={user.id}>{user.name + '    '}{user.id}</h2>
//             {/* Correct way, but not working */}
//             {/* <audio src={user.stream} autoPlay></audio> */}
//             <p>{user.stream ? 'Speaking' : 'Not Speaking'}</p>
//         </div>
//     )
// })} 