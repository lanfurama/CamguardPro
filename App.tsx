import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Camera, Property } from './types';
import { CameraList } from './components/CameraList';
import { Dashboard } from './components/Dashboard';
import { CameraFormModal } from './components/CameraFormModal';
import { PropertyFormModal } from './components/PropertyFormModal';
import { ImportModal } from './components/ImportModal';
import { ConfigurationPanel } from './components/ConfigurationPanel';
import { AIReportPanel } from './components/AIReportPanel';
import { AppProvider, useApp } from './context/AppContext';

function AppContent() {
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [editingCamera, setEditingCamera] = useState<Camera | null>(null);
  const [defaultPropertyIdForNewCamera, setDefaultPropertyIdForNewCamera] = useState<string | null>(null);
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
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
    handleSaveCamera,
    handleDeleteCamera,
    handleDeleteAllCamerasByProperty,
    handleImportCameras,
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
      setDefaultPropertyIdForNewCamera(null);
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

      {activeTab === 'properties' && (
        <CameraList
          cameras={cameras}
          camerasLoading={camerasLoading}
          camerasError={camerasError}
          onRefetchCameras={refetchCameras}
          properties={properties}
          propertiesLoading={propertiesLoading}
          onUpdateNotes={updateCameraNotes}
          onEditCamera={(cam) => {
            setEditingCamera(cam);
            setShowCameraModal(true);
          }}
          onDeleteCamera={handleDeleteCamera}
          onDeleteAllCamerasByProperty={handleDeleteAllCamerasByProperty}
          onAddCamera={(propertyId) => {
            setEditingCamera(null);
            setDefaultPropertyIdForNewCamera(propertyId ?? null);
            setShowCameraModal(true);
          }}
          onImportCamera={() => setShowImportModal(true)}
          onEditProperty={(prop) => {
            setEditingProperty(prop);
            setShowPropertyModal(true);
          }}
          onAddProperty={() => {
            setEditingProperty(null);
            setShowPropertyModal(true);
          }}
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
          defaultPropertyId={defaultPropertyIdForNewCamera ?? undefined}
          onClose={() => {
            setShowCameraModal(false);
            setDefaultPropertyIdForNewCamera(null);
          }}
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

      {showPropertyModal && (
        <PropertyFormModal
          property={editingProperty}
          onSave={async (prop) => {
            const ok = await handleSaveProperty(prop);
            if (ok) {
              setShowPropertyModal(false);
              setEditingProperty(null);
              refetchProperties();
            }
            return ok;
          }}
          onClose={() => {
            setShowPropertyModal(false);
            setEditingProperty(null);
          }}
          onDelete={handleDeleteProperty}
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
