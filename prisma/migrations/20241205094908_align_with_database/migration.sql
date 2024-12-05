-- CreateIndex
CREATE INDEX "idx_areas_boundary" ON "Area" USING GIST ("boundary");
