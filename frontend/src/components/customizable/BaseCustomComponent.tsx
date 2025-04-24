import { ReactElement, useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';

type ComponentConfig = {
 componentType: string;
 properties: Record<string, unknown>;
 layoutOptions?: {
 width?: string | number;
 height?: string | number;
 };
};

export const BaseCustomComponent = ({
 config,
 children
}: {
 config: ComponentConfig;
 children?: ReactElement | ReactElement[];
}) => {
 const [localConfig, setLocalConfig] = useState(config);

 useEffect(() => {
 // Konfigürasyon değişikliklerini dinle
 setLocalConfig(config);
 }, [config]);

 return (
 <Paper 
 elevation={3} 
 sx={{ 
 p: 2,
 width: localConfig.layoutOptions?.width || '100%',
 height: localConfig.layoutOptions?.height || 'auto'
 }}
 >
 <Box sx={{ mb: 2 }}>
 <Typography variant="h6" component="div">
 {localConfig.componentType}
 </Typography>
 </Box>
 {children}
 </Paper>
 );
};