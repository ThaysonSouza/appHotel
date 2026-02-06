import React from 'react';
import { Pressable, Modal as RNModal, Text, TextStyle, View, ViewStyle } from 'react-native';
import { borderRadius, colors, shadows, spacing, typography } from './designTokens';

type CustomModalProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

const CustomModal = ({ visible, onClose, title, children }: CustomModalProps) => {
  return (
    <RNModal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable 
        style={styles.overlay}
        onPress={onClose}
      >
        <Pressable 
          style={styles.modalContainer}
          onPress={() => {}}
        >
          <View style={styles.modalContent}>
            {title && (
              <Text style={styles.modalTitle}>
                {title}
              </Text>
            )}
            
            {children}
          </View>
        </Pressable>
      </Pressable>
    </RNModal>
  );
};

const styles = {
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
  } as ViewStyle,
  
  modalContainer: {
    width: '90%',
    maxWidth: 400,
  } as ViewStyle,
  
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xxxl,
    padding: spacing.xl,
    ...shadows.lg,
  } as ViewStyle,
  
  modalTitle: {
    fontSize: typography.size.xl,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.base,
  } as TextStyle,
};

export default CustomModal;
