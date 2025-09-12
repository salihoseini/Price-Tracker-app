import React from 'react';
import { Box, Typography, Paper, Link } from '@mui/material';

const About = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 'bold' }}>
        درباره ما
      </Typography>

      <Paper elevation={0} sx={{ p: 3 }}>
        <Typography variant="body1" paragraph>
          این اپلیکیشن یک پروژه نمونه برای نمایش قیمت‌های لحظه‌ای دارایی‌های مختلف مانند طلا، سکه و ارز است. این برنامه با استفاده از جدیدترین تکنولوژی‌های وب و با تمرکز بر تجربه کاربری مدرن و روان ساخته شده است.
        </Typography>
        <Typography variant="h6" component="h2" sx={{ mt: 3, mb: 1 }}>
          تکنولوژی‌های استفاده شده
        </Typography>
        <Typography variant="body1" component="div">
          <ul>
            <li><strong>React:</strong> کتابخانه محبوب برای ساخت رابط‌های کاربری.</li>
            <li><strong>Material-UI (MUI):</strong> برای طراحی کامپوننت‌های زیبا و واکنش‌گرا.</li>
            <li><strong>Recharts:</strong> برای نمایش نمودارهای قیمت تعاملی.</li>
            <li><strong>Vite:</strong> ابزار ساخت سریع و مدرن برای توسعه وب.</li>
            <li><strong>PWA:</strong> قابلیت نصب روی دستگاه برای دسترسی آفلاین و تجربه نزدیک به اپ بومی.</li>
          </ul>
        </Typography>
        <Typography variant="h6" component="h2" sx={{ mt: 3, mb: 1 }}>
          منبع داده‌ها
        </Typography>
        <Typography variant="body1">
          تمام داده‌های قیمت از API عمومی وبسایت{' '}
          <Link href="https://price.fiai.ir/" target="_blank" rel="noopener">
            price.fiai.ir
          </Link>
          {' '}دریافت می‌شود.
        </Typography>
      </Paper>
    </Box>
  );
};

export default About;

