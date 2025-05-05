/**
 * @openapi
 * /api/v1/entries:
 *   get:
 *     summary: Get all entries
 *     tags:
 *       - Entries
 *     responses:
 *       200:
 *         description: A list of entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   title:
 *                     type: string
 */
