import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Image, Box } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';

const ProjectDetailsModal = ({ project, isOpen, onClose }) => {
  if (!project) return null; // Return null if no project is selected

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{project.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mb={4}>
            <Image src={project.image} borderRadius="lg" />
          </Box>
          <ReactMarkdown>
            {project.description}
          </ReactMarkdown>
          {/* You can add more project details here */}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProjectDetailsModal;