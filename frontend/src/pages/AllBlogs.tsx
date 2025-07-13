import AddIcon from "@mui/icons-material/Add";
import CodeIcon from '@mui/icons-material/Code';
import DownloadIcon from '@mui/icons-material/Download';
import SecurityIcon from '@mui/icons-material/Security';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import {
    AppBar,
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    Container,
    Divider,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Paper,
    Stack,
    Toolbar,
    Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useAllBlogs } from "../hooks/useBlogData";

const scanReportPath = `${import.meta.env.BASE_URL}scan/`;

const AllBlogs: React.FC = () => {
    const { blogs, loading, error } = useAllBlogs();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
            <AppBar position="static" color="primary" elevation={2}>
                <Toolbar>
                    <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700 }}>
                        <Link to={"/blogs"} style={{ color: "inherit", textDecoration: "none" }}>
                            FellowBlog
                        </Link>
                    </Typography>

                    <Button
                        variant="outlined"
                        color="inherit"
                        startIcon={<SecurityIcon />}
                        sx={{ fontWeight: 600, mr: 2 }}
                        component="a"
                        href={scanReportPath} // Use the corrected, dynamic path
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Scan Reports
                    </Button>

                    <Box sx={{ mr: 2 }}>
                        <Button
                            id="download-artifacts-button"
                            aria-controls={open ? 'download-artifacts-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            variant="outlined"
                            color="inherit"
                            startIcon={<DownloadIcon />}
                            sx={{ fontWeight: 600 }}
                        >
                            Downloads
                        </Button>
                        <Menu
                            id="download-artifacts-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem disabled><Typography variant="caption">Backend 1</Typography></MenuItem>
                            <MenuItem component="a" href="https://github.com/reetwiz/reetwiz-fellowblogs-cd/releases/download/latest/build-artifact-backend1.zip" onClick={handleClose}>
                                <ListItemIcon><CodeIcon fontSize="small" /></ListItemIcon>
                                <ListItemText>Source (.zip)</ListItemText>
                            </MenuItem>
                            <MenuItem component="a" href="https://github.com/reetwiz/reetwiz-fellowblogs-cd/releases/download/latest/image-backend1.tar" onClick={handleClose}>
                                <ListItemIcon><WebAssetIcon fontSize="small" /></ListItemIcon>
                                <ListItemText>Image (.tar)</ListItemText>
                            </MenuItem>
                            <Divider />

                            <MenuItem disabled><Typography variant="caption">Backend 2</Typography></MenuItem>
                            <MenuItem component="a" href="https://github.com/reetwiz/reetwiz-fellowblogs-cd/releases/download/latest/build-artifact-backend2.zip" onClick={handleClose}>
                                <ListItemIcon><CodeIcon fontSize="small" /></ListItemIcon>
                                <ListItemText>Source (.zip)</ListItemText>
                            </MenuItem>
                            <MenuItem component="a" href="https://github.com/reetwiz/reetwiz-fellowblogs-cd/releases/download/latest/image-backend2.tar" onClick={handleClose}>
                                <ListItemIcon><WebAssetIcon fontSize="small" /></ListItemIcon>
                                <ListItemText>Image (.tar)</ListItemText>
                            </MenuItem>
                            <Divider />

                            <MenuItem disabled><Typography variant="caption">Frontend</Typography></MenuItem>
                            <MenuItem component="a" href="https://github.com/reetwiz/reetwiz-fellowblogs-cd/releases/download/latest/build-artifact-frontend.zip" onClick={handleClose}>
                                <ListItemIcon><CodeIcon fontSize="small" /></ListItemIcon>
                                <ListItemText>Source (.zip)</ListItemText>
                            </MenuItem>
                            <MenuItem component="a" href="https://github.com/reetwiz/reetwiz-fellowblogs-cd/releases/download/latest/image-frontend.tar" onClick={handleClose}>
                                <ListItemIcon><WebAssetIcon fontSize="small" /></ListItemIcon>
                                <ListItemText>Image (.tar)</ListItemText>
                            </MenuItem>
                        </Menu>
                    </Box>

                    <Button
                        component={Link}
                        to="/blogs/create"
                        variant="contained"
                        color="secondary"
                        startIcon={<AddIcon />}
                        sx={{ fontWeight: 600 }}
                    >
                        Create Blog
                    </Button>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ mt: 4 }}>
                {loading && (
                    <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                        Loading...
                    </Typography>
                )}
                {error && (
                    <Typography variant="h6" color="error" align="center" sx={{ mt: 4 }}>
                        {error}
                    </Typography>
                )}
                {blogs.length === 0 && !loading && (
                    <Paper sx={{ p: 4, textAlign: "center" }}>
                        <Typography variant="h6">No blogs found.</Typography>
                    </Paper>
                )}
                <Stack
                    direction="row"
                    flexWrap="wrap"
                    gap={4}
                    justifyContent="flex-start"
                    alignItems="stretch"
                    sx={{ mt: 2 }}
                >
                    {blogs.map((blog) => (
                        <Box
                            key={blog.id}
                            sx={{
                                width: "100%",
                                maxWidth: 400,
                                minWidth: 260,
                                flexGrow: 1,
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Card
                                sx={{
                                    width: "100%",
                                    maxWidth: 400,
                                    height: 300,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "flex-end",
                                    background: "#111",
                                    color: "#fff",
                                    boxShadow: 6,
                                    borderRadius: 3,
                                    position: "relative",
                                    overflow: "hidden",
                                    transition: "box-shadow 0.2s",
                                    "&:hover": {
                                        boxShadow: 12,
                                    },
                                    textDecoration: "none",
                                }}
                            >
                                <CardActionArea
                                    component={Link}
                                    to={`/blogs/${blog.id}`}
                                    sx={{
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "flex-end",
                                        alignItems: "stretch",
                                        p: 0,
                                        background: "transparent",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                            height: "80%",
                                            bgcolor: "#111",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            filter: "blur(1.5px) brightness(0.8)",
                                            zIndex: 1,
                                            px: 2,
                                            userSelect: "none",
                                        }}
                                    >
                                        <Typography
                                            variant="h2"
                                            sx={{
                                                fontWeight: 700,
                                                color: "#444",
                                                opacity: 0.4,
                                                fontSize: { xs: "2.5rem", md: "3rem" },
                                                letterSpacing: 2,
                                                textAlign: "left",
                                                width: "100%",
                                                textShadow: "0 2px 8px #000",
                                                whiteSpace: "pre-line",
                                            }}
                                        >
                                            {blog.content.substring(50, 200)}
                                        </Typography>
                                    </Box>
                                    <CardContent
                                        sx={{
                                            mt: "auto",
                                            bgcolor: "#fff",
                                            borderTop: "1px solid #eee",
                                            width: "100%",
                                            px: 2,
                                            py: 1.5,
                                            position: "absolute",
                                            bottom: 0,
                                            left: 0,
                                            zIndex: 2,
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 700,
                                                color: "#111",
                                                mb: 0.5,
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                                textAlign: "left",
                                            }}
                                        >
                                            {blog.title}
                                        </Typography>
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                color: "#444",
                                                fontWeight: 400,
                                                fontSize: "1rem",
                                                textAlign: "left",
                                            }}
                                        >
                                            {blog.firstName} {blog.lastName}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Box>
                    ))}
                </Stack>
            </Container>
        </Box>
    );
};

export default AllBlogs;