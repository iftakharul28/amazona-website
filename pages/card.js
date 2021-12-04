import {
  Button,
  Card,
  Grid,
  Link,
  List,
  ListItem,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import Dynamic from 'next/dynamic';
import React, { useContext } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import NextLink from 'next/link';
import Image from 'next/image';
import axios from 'axios';
function CardScreen() {
  const { state, dispatch } = useContext(Store);
  const {
    card: { cardItems },
  } = state;
  const UpdateCardHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock <= 0) {
      window.alert('product not in stock');
      return;
    }
    dispatch({ type: 'CARD_ADD_ITEM', payload: { ...item, quantity } });
  };
  const removeItemHandler = (item) => {
    dispatch({ type: 'CARD_REMOVE_ITEM', payload: item });
  };
  return (
    <Layout title="Shopping Cart">
      <Typography component="h1" variant="h1">
        Shopping Cart
      </Typography>
      {cardItems.length === 0 ? (
        <div>
          Card Is Empty.
          <NextLink href="/" passHref>
            <Link>Go To Shoping</Link>
          </NextLink>
        </div>
      ) : (
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cardItems.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        <NextLink href={`/product/${item.slug}`} passHref>
                          <Link>
                            <Image
                              src={item.image}
                              alt={item.name}
                              height={50}
                              width={50}
                            />
                          </Link>
                        </NextLink>
                      </TableCell>
                      <TableCell>
                        <NextLink href={`/product/${item.slug}`} passHref>
                          <Link>
                            <Typography>{item.name}</Typography>
                          </Link>
                        </NextLink>
                      </TableCell>
                      <TableCell align="right">
                        <Select
                          value={item.quantity}
                          onChange={(e) =>
                            UpdateCardHandler(item, e.target.value)
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <MenuItem key={x + 1} value={x + 1}>
                              {x + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>
                      <TableCell align="right">
                        <Typography>$ {item.price}</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => removeItemHandler(item)}
                        >
                          x
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Typography variant="h2">
                    SubTotal ({cardItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items) : ${' '}
                    {cardItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Button variant="contained" color="primary">
                    Check Out
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}
export default Dynamic(() => Promise.resolve(CardScreen), { ssr: false });
