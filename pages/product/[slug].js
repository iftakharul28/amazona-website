import React, { useContext } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import {
  Button,
  Card,
  Grid,
  Link,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';
import Layout from '../../components/Layout';
import useStyles from '../../styles/Style';
import Product from '../../models/Product';
import db from '../../utils/db';
import axios from 'axios';
import { Store } from '../../utils/Store';
import { useRouter } from 'next/router';

export default function ProductScreen(props) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { product } = props;
  const classes = useStyles();
  if (!product) {
    return (
      <div>
        <p>Product Not Found</p>
      </div>
    );
  }
  const addToCardHandler = async () => {
    const existItem = state.card.cardItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('product out stock');
      return;
    }
    dispatch({ type: 'CARD_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/card');
  };
  return (
    <Layout title={product.name} description={product.description}>
      <div className={classes.section}>
        <NextLink href="/" passHref>
          <Link>
            <Typography>Back To Home</Typography>
          </Link>
        </NextLink>
      </div>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          />
        </Grid>
        <Grid item>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">
                {product.name}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Category: {product.category}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Brand: {product.brand}</Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Rating: {product.rating} Stars ({product.numReviews} reviews)
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Description: {product.description}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>price: {product.price} $</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>
                      Qty:{' '}
                      {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={addToCardHandler}
                >
                  Add To Card
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
}
