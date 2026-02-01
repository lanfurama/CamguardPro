import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Camera } from './types';
import { CameraList } from './components/CameraList';
import { Dashboard } from './components/Dashboard';
import { CameraFormModal } from './components/CameraFormModal';
import { ImportModal } from './components/ImportModal';
import { ConfigurationPanel } from './components/ConfigurationPanel';
import { AIReportPanel } from './components/AIReportPanel';
import { AppProvider, useApp } from './context/AppContext';

function AppContent() {
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [editingCamera, setEditingCamera] = useState<Camera | null>(null);
  const [showImportModal, setShowImportModal] = useState(false);

  const {
    activeTab,
    setActiveTab,
    notifications,
    clearNotifications,
    cameras,
    camerasLoading,
    camerasError,
    properties,
    propertiesLoading,
    propertiesError,
    brands,
    brandsLoading,
    simulatingCameraIds,
    handleSaveCamera,
    handleDeleteCamera,
    handleImportCameras,
    toggleSimulation,
    updateCameraNotes,
    handleSaveProperty,
    handleDeleteProperty,
    handleAddBrand,
    handleDeleteBrand,
    reportLoading,
    reportContent,
    generateReport,
    clearReport,
  } = useApp();

  const handleSaveCameraAndClose = async (data: Camera) => {
    const ok = await handleSaveCamera(data, editingCamera);
    if (ok) {
      setShowCameraModal(false);
      setEditingCamera(null);
    }
  };

  return (
    <Layout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      notifications={notifications}
      onClearNotifications={clearNotifications}
    >
      {activeTab === 'dashboard' && (
        <>
          {camerasError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {camerasError}
            </div>
          )}
          <AIReportPanel
            content={reportContent ?? ''}
            loading={reportLoading}
            onGenerate={generateReport}
            onClose={clearReport}
          />
          <Dashboard cameras={cameras} properties={properties} />
        </>
      )}

      {(activeTab === 'properties' || activeTab === 'cameras') && (
        <CameraList
          cameras={cameras}
          camerasLoading={camerasLoading}
          camerasError={camerasError}
          properties={properties}
          propertiesLoading={propertiesLoading}
          simulatingIds={simulatingCameraIds}
          onToggleSimulate={toggleSimulation}
          filterByProperty={activeTab === 'properties'}
          onUpdateNotes={updateCameraNotes}
          onEditCamera={(cam) => {
            setEditingCamera(cam);
            setShowCameraModal(true);
          }}
          onDeleteCamera={handleDeleteCamera}
          onAddCamera={() => {
            setEditingCamera(null);
            setShowCameraModal(true);
          }}
          onImportCamera={() => setShowImportModal(true)}
        />
      )}

      {activeTab === 'settings' && (
        <ConfigurationPanel
          properties={properties}
          brands={brands}
          propertiesLoading={propertiesLoading}
          brandsLoading={brandsLoading}
          onSaveProperty={handleSaveProperty}
          onDeleteProperty={handleDeleteProperty}
          onAddBrand={handleAddBrand}
          onDeleteBrand={handleDeleteBrand}
        />
      )}

      {showCameraModal && (
        <CameraFormModal
          camera={editingCamera}
          properties={properties}
          brands={brands}
          onClose={() => setShowCameraModal(false)}
          onSave={handleSaveCameraAndClose}
        />
      )}

      {showImportModal && (
        <ImportModal
          properties={properties}
          onClose={() => setShowImportModal(false)}
          onImport={handleImportCameras}
        />
      )}
    </Layout>
  );
}

const App: React.FC = () => (
  <AppProvider>
    <AppContent />
  </AppProvider>
);

export default App;
