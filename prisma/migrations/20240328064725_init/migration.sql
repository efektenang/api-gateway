-- CreateEnum
CREATE TYPE "Protocols" AS ENUM ('http', 'https');

-- CreateEnum
CREATE TYPE "Statuses" AS ENUM ('active', 'disabled');

-- CreateEnum
CREATE TYPE "Header" AS ENUM ('static', 'dynamic');

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "user_name" TEXT NOT NULL,
    "full_name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_by" TEXT,
    "updated_at" TIMESTAMP(3),
    "deleted_by" TEXT,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Workspace" (
    "workspace_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "service_id" INTEGER NOT NULL,
    "description" TEXT,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_by" TEXT,
    "updated_at" TIMESTAMP(3),
    "deleted_by" TEXT,
    "deleted_at" TIMESTAMP(3),
    "userUser_id" INTEGER,

    CONSTRAINT "Workspace_pkey" PRIMARY KEY ("workspace_id")
);

-- CreateTable
CREATE TABLE "WorkspaceMember" (
    "member_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "workspace_id" INTEGER NOT NULL,
    "description" TEXT,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_by" TEXT,
    "updated_at" TIMESTAMP(3),
    "deleted_by" TEXT,
    "deleted_at" TIMESTAMP(3),
    "workspaceWorkspace_id" INTEGER,

    CONSTRAINT "WorkspaceMember_pkey" PRIMARY KEY ("member_id")
);

-- CreateTable
CREATE TABLE "Service" (
    "service_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "protocol" "Protocols" NOT NULL DEFAULT 'http',
    "host" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "status" "Statuses" NOT NULL DEFAULT 'active',
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_by" TEXT,
    "updated_at" TIMESTAMP(3),
    "deleted_by" TEXT,
    "deleted_at" TIMESTAMP(3),
    "workspaceWorkspace_id" INTEGER,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("service_id")
);

-- CreateTable
CREATE TABLE "Routes" (
    "route_id" INTEGER NOT NULL,
    "service_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "valid_header" "Header" NOT NULL DEFAULT 'dynamic',
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_by" TEXT,
    "updated_at" TIMESTAMP(3),
    "deleted_by" TEXT,
    "deleted_at" TIMESTAMP(3),
    "serviceService_id" TEXT,

    CONSTRAINT "Routes_pkey" PRIMARY KEY ("route_id")
);

-- CreateTable
CREATE TABLE "Endpoints" (
    "endpoint_id" SERIAL NOT NULL,
    "route_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "description" TEXT,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_by" TEXT,
    "updated_at" TIMESTAMP(3),
    "deleted_by" TEXT,
    "deleted_at" TIMESTAMP(3),
    "routesRoute_id" INTEGER,

    CONSTRAINT "Endpoints_pkey" PRIMARY KEY ("endpoint_id")
);

-- CreateTable
CREATE TABLE "Endpoint_Methods" (
    "id" SERIAL NOT NULL,
    "method" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_by" TEXT,
    "updated_at" TIMESTAMP(3),
    "deleted_by" TEXT,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Endpoint_Methods_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_userUser_id_fkey" FOREIGN KEY ("userUser_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkspaceMember" ADD CONSTRAINT "WorkspaceMember_workspaceWorkspace_id_fkey" FOREIGN KEY ("workspaceWorkspace_id") REFERENCES "Workspace"("workspace_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_workspaceWorkspace_id_fkey" FOREIGN KEY ("workspaceWorkspace_id") REFERENCES "Workspace"("workspace_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Routes" ADD CONSTRAINT "Routes_serviceService_id_fkey" FOREIGN KEY ("serviceService_id") REFERENCES "Service"("service_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Endpoints" ADD CONSTRAINT "Endpoints_routesRoute_id_fkey" FOREIGN KEY ("routesRoute_id") REFERENCES "Routes"("route_id") ON DELETE SET NULL ON UPDATE CASCADE;
