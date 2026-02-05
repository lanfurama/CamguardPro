import React, { createContext, useContext, ReactNode } from 'react';
import { Camera, Property } from '../types';
import {
  useNotifications,
  useCameras,
  useProperties,
  useBrands,
  useReport,
} from '../hooks';

interface AppContextValue {
  // Tab
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Notifications
  notifications: ReturnType<typeof useNotifications>['notifications'];
  addNotification: ReturnType<typeof useNotifications>['addNotification'];
  clearNotifications: ReturnType<typeof useNotifications>['clearNotifications'];

  // Cameras
  cameras: Camera[];
  camerasLoading: boolean;
  camerasError: string | null;
  refetchCameras: () => Promise<void>;
  simulatingCameraIds: Set<string>;
  handleSaveCamera: (data: Camera, editingCamera: Camera | null) => void;
  handleDeleteCamera: (id: string) => void;
  handleDeleteAllCamerasByProperty: (propertyId: string) => Promise<number>;
  handleImportCameras: (cameras: Camera[]) => void;
  toggleSimulation: (cameraId: string) => void;
  updateCameraNotes: (id: string, notes: string) => void;

  // Properties
  properties: Property[];
  propertiesLoading: boolean;
  propertiesError: string | null;
  refetchProperties: () => Promise<void>;
  handleSaveProperty: (prop: Property) => void;
  handleDeleteProperty: (id: string) => void;

  // Brands
  brands: string[];
  brandsLoading: boolean;
  handleAddBrand: (brand: string) => void;
  handleDeleteBrand: (brand: string) => void;

  // Report
  reportLoading: boolean;
  reportContent: string | null;
  generateReport: () => Promise<void>;
  clearReport: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = React.useState('dashboard');

  const { notifications, addNotification, clearNotifications } = useNotifications();
  const camerasData = useCameras(addNotification);
  const propertiesData = useProperties(addNotification);
  const brandsData = useBrands();
  const { reportLoading, reportContent, generateReport, clearReport } = useReport(
    camerasData.cameras
  );

  const value: AppContextValue = {
    activeTab,
    setActiveTab,
    notifications,
    addNotification,
    clearNotifications,
    cameras: camerasData.cameras,
    camerasLoading: camerasData.loading,
    camerasError: camerasData.error,
    refetchCameras: camerasData.refetch,
    simulatingCameraIds: camerasData.simulatingCameraIds,
    handleSaveCamera: (data, editing) => camerasData.handleSaveCamera(data, editing),
    handleDeleteCamera: camerasData.handleDeleteCamera,
    handleDeleteAllCamerasByProperty: camerasData.handleDeleteAllCamerasByProperty,
    handleImportCameras: camerasData.handleImportCameras,
    toggleSimulation: camerasData.toggleSimulation,
    updateCameraNotes: camerasData.updateCameraNotes,
    properties: propertiesData.properties,
    propertiesLoading: propertiesData.loading,
    propertiesError: propertiesData.error,
    refetchProperties: propertiesData.refetch,
    handleSaveProperty: propertiesData.handleSaveProperty,
    handleDeleteProperty: propertiesData.handleDeleteProperty,
    brands: brandsData.brands,
    brandsLoading: brandsData.loading,
    handleAddBrand: brandsData.handleAddBrand,
    handleDeleteBrand: brandsData.handleDeleteBrand,
    reportLoading,
    reportContent,
    generateReport,
    clearReport,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
