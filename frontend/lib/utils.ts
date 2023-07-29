import { Metadata } from "next";

export function constructMetadata({
    title = "BlackBird - A tool to help designers and developers become more effecient.",
    description = "We're building a tool to help designers and developers become more effecient and we need help. Join the private beta to help us test things out",
    image = "https://blackbird.vercel.app/_static/thumbnail.png",
    icons = "/favicon.ico",
    }: {
    title?: string;
    description?: string;
    image?: string;
    icons?: string;
    } = {}): Metadata {
    return {
        title,
        description,
        openGraph: {
        title,
        description,
        images: [
            {
            url: image,
            },
        ],
        },
        twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image],
        creator: "@blackbirddotapp",
        },
        icons,
        metadataBase: new URL("https://blackbird.vercel.app"),
        themeColor: "#000",
    };
}