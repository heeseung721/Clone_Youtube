import { createGlobalStyle } from "styled-components";
import Heycomic from "./Heycomic.woff";

export default createGlobalStyle`
    @font-face {
        font-family: "Heycomic";
        src: local("Heycomic"),
        url(${Heycomic});
    }
`;
