import { useState, useEffect } from 'react';
import { Box, Paper, Typography, Button, LinearProgress } from '@mui/material';
import axios from 'axios';

type LicenseInfo = {
 id: string;
 maxUsers: number;
 currentUsers: number;
 expirationDate: string;
};

export const LicenseDashboard = () => {
 const [licenseData, setLicenseData] = useState<LicenseInfo | null>(null);

 useEffect(() => {
 const fetchLicenseData = async () => {
 try {
 const response = await axios.get('/api/license');
 setLicenseData(response.data);
 } catch (error) {
 console.error('Lisans verileri alınamadı:', error);
 }
 };
 fetchLicenseData();
 }, []);

 const generateKey = async () => {
 try {
 const response = await axios.post('/api/license/generate');
 alert(`Yeni lisans anahtarınız: ${response.data.key}`);
 } catch (error) {
 console.error('Anahtar oluşturma hatası:', error);
 }
 };

 return (
 <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
 <Typography variant="h6" gutterBottom>
 Lisans Yönetim Paneli
 </Typography>

 {licenseData ? (
 <Box sx={{ mt: 2 }}>
 <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
 <Typography>Aktif Kullanıcı:</Typography>
 <Typography>{licenseData.currentUsers}/{licenseData.maxUsers}</Typography>
 </Box>
 
 <LinearProgress
 variant="determinate"
 value={(licenseData.currentUsers / licenseData.maxUsers) * 100}
 sx={{ height: 10, mb: 2 }}
 />

 <Button 
 variant="contained" 
 color="primary"
 onClick={generateKey}
 fullWidth
 >
 Yeni Lisans Anahtarı Oluştur
 </Button>
 </Box>
 ) : (
 <Typography>Lisans verileri yükleniyor...</Typography>
 )}
 </Paper>
 );
};