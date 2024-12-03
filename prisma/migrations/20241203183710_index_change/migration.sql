-- DropIndex
DROP INDEX "Log_areaId_idx";

-- DropIndex
DROP INDEX "Log_entryTime_idx";

-- DropIndex
DROP INDEX "Log_userId_idx";

-- CreateIndex
CREATE INDEX "Log_userId_entryTime_idx" ON "Log"("userId", "entryTime");
