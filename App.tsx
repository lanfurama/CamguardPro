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
    refetchCameras,
    refetchProperties,
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
            <div className="mb-3 p-3 bg-red-50 border border-red-200 text-red-700">
              <p className="font-medium text-sm">{camerasError}</p>
              {(camerasError.includes('Database') || camerasError.includes('cấu hình') || camerasError.includes('503')) && (
                <p className="mt-1.5 text-xs opacity-90">
                  Kiểm tra: (1) File <code className="bg-red-100 px-1">.env</code> có <code>DATABASE_URL</code> hoặc <code>DB_HOST, DB_NAME, DB_USER, DB_PASSWORD</code> — (2) Đã chạy <code>database/schema.sql</code> và <code>database/seed-furama-sites.sql</code> (nếu dùng Furama). Chạy dev bằng <code>npm run dev</code> để API đọc .env.
                </p>
              )}
              <button type="button" onClick={() => { refetchCameras(); refetchProperties(); }} className="mt-2 px-2 py-1 bg-red-100 hover:bg-red-200 text-red-800 text-xs font-medium">Thử lại</button>
            </div>
          )}
          {!camerasLoading && !propertiesLoading && !camerasError && !propertiesError && cameras.length === 0 && properties.length === 0 && (
            <div className="mb-3 p-3 bg-amber-50 border border-amber-200 text-amber-800 text-sm">
              <p className="font-medium">Chưa có dữ liệu từ database.</p>
              <p className="mt-1 text-xs">Nếu bạn dùng PostgreSQL: cấu hình <code className="bg-amber-100 px-1">.env</code>, chạy <code>database/schema.sql</code> rồi <code>database/seed-furama-sites.sql</code> (nếu cần). Sau đó tải lại trang.</p>
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
          onRefetchCameras={refetchCameras}
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
