import * as React from 'react';
import { Appbar, Surface, Text, Button } from 'react-native-paper';

const Header = (props) => {
  const {goBack} = props;
  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');

  return (
    <Appbar.Header mode='center-aligned' elevated>
      {goBack !== undefined && <Appbar.BackAction onPress={goBack} />}
      <Appbar.Content title="Rowbotics" />
      {/* <Button icon="account" mode="contained-tonal" textColor="black" onPress={_handleSearch}>
        Sign in
      </Button> */}
    </Appbar.Header>
  );
};

export default Header;