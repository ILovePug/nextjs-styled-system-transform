import { layout } from 'styled-system'
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';

const theme = {
	sizes: 50,
};

const Box = styled.div`
    display: inline-block;
	border: 1px solid red;
	${layout}
	
`;

export default function Index() {
	return (
		<ThemeProvider theme={theme}>
			<Box height={0.7}>
				<p>Hello Next.js</p>
			</Box>
		</ThemeProvider>
	);
}
