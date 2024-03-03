import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, VStack, HStack, AspectRatio, IconButton, Text } from "@chakra-ui/react";
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaMinus, FaPlus, FaYoutube } from "react-icons/fa";

const Index = () => {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [videoId, setVideoId] = useState("");

  // Function to extract video ID from YouTube URL
  const extractVideoID = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  };

  // Function to handle URL input change
  const handleUrlChange = (event) => {
    setYoutubeUrl(event.target.value);
  };

  // Function to handle Play button click
  const playKaraoke = () => {
    const videoID = extractVideoID(youtubeUrl);
    if (videoID) {
      setVideoId(videoID);
    } else {
      alert("Please enter a valid YouTube URL.");
    }
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={6}>
        <FormControl id="youtube-url" isRequired>
          <FormLabel>YouTube URL</FormLabel>
          <HStack>
            <Input placeholder="Enter YouTube Karaoke Video URL" value={youtubeUrl} onChange={handleUrlChange} />
            <IconButton colorScheme="red" aria-label="Play Video" icon={<FaYoutube />} onClick={playKaraoke} />
          </HStack>
        </FormControl>

        {videoId && (
          <AspectRatio ratio={16 / 9}>
            <iframe title="Karaoke Video" src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} allowFullScreen />
          </AspectRatio>
        )}

        <HStack spacing={4}>
          <Text>Key:</Text>
          <Button leftIcon={<FaMinus />} size="sm">
            Down
          </Button>
          <Button leftIcon={<FaPlus />} size="sm">
            Up
          </Button>
        </HStack>

        <HStack spacing={4}>
          <Text>Tempo:</Text>
          <Button leftIcon={<FaMinus />} size="sm">
            Slower
          </Button>
          <Button leftIcon={<FaPlus />} size="sm">
            Faster
          </Button>
        </HStack>

        <HStack spacing={4}>
          <IconButton aria-label="Rewind" icon={<FaStepBackward />} isRound />
          <IconButton aria-label="Play" icon={<FaPlay />} isRound />
          <IconButton aria-label="Pause" icon={<FaPause />} isRound />
          <IconButton aria-label="Forward" icon={<FaStepForward />} isRound />
        </HStack>
      </VStack>
    </Container>
  );
};

export default Index;
