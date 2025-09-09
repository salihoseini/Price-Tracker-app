import React from 'react';
import {
  Card,
  CardActionArea,
  Typography,
  Box,
  Alert,
  Link,
  Stack,
  Skeleton
} from '@mui/material';
import { usePriceData } from '../hooks/usePriceData';
import { fetchMarketNews } from '../services/api';

const NewsCardSkeleton = () => (
    <Card elevation={0}>
        <Box sx={{p: 2}}>
            <Skeleton variant="text" height={30} />
            <Skeleton variant="text" width="40%" sx={{mb: 1}}/>
            <Skeleton variant="text" />
            <Skeleton variant="text" width="80%"/>
        </Box>
    </Card>
)

const News = () => {
  const { data: news, loading, error } = usePriceData(fetchMarketNews);

  if (error || (!loading && (!news || news.length === 0))) {
    return <Alert severity="warning" variant="filled">اخبار در حال حاضر در دسترس نیست.</Alert>;
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        اخبار
      </Typography>
      <Stack spacing={2}>
        {loading ? [...Array(5)].map((_, i) => <NewsCardSkeleton key={i}/>) :
            news.map((article) => (
              <Card key={article.id} elevation={0}>
                <CardActionArea component={Link} href={article.url} target="_blank" rel="noopener noreferrer" sx={{p: 2}}>
                    <Typography variant="h6" component="h2" gutterBottom sx={{fontWeight: 600}}>{article.headline}</Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {article.source} - {new Date(article.datetime * 1000).toLocaleDateString('fa-IR')}
                    </Typography>
                </CardActionArea>
              </Card>
            ))
        }
      </Stack>
    </Box>
  );
};

export default News;

